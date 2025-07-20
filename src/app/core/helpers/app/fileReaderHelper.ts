interface ValueFile {
    file: any | string;
    name: string;
    size: number;
    format: string | null;
    formatPrefix: string;
}

interface CyclesFile {
    progress?: (value: number) => void;
    next?: (value: ValueFile) => void;
    complete?: () => void;
}

interface OptionsLoad {
    encode: 'file' | 'base64' | 'btoa';
}

export class FileReaderHelper {
    private files: File[];
    private options: OptionsLoad;
    private cycle: CyclesFile;

    constructor(files: File[], options: OptionsLoad, cycle: CyclesFile) {
        this.files = files;
        this.options = options;
        this.cycle = cycle;
        this.processFiles();
    }

    private processFiles() {
        let processedCount = 0;

        const handleResult = (file: File, content: any | string) => {
            const formatPrefix = file.name.split('.').pop()?.toLowerCase() || '';
            const nameWithoutPrefix = file.name.replace(new RegExp(`.${formatPrefix}$`), '');

            const result: ValueFile = {
                file: content,
                name: nameWithoutPrefix,
                size: file.size,
                format: file.type || null,
                formatPrefix
            };

            this.cycle.next?.(result);

            processedCount++;
            if (processedCount === this.files.length) {
                this.cycle.complete?.();
            }
        };

        for (const file of this.files) {
            if (this.options.encode === 'file') {
                handleResult(file, file);
                continue;
            }

            const reader = new FileReader();

            reader.onprogress = (event: ProgressEvent<FileReader>) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    this.cycle.progress?.(percent);
                }
            };

            reader.onloadend = () => {
                this.cycle.progress?.(100);
                let content = reader.result;

                if (this.options.encode === 'btoa' && typeof content === 'string') {
                    content = `data:${file.type};base64,` + btoa(content);
                }

                handleResult(file, content);
            };

            if (this.options.encode === 'base64') {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
        }
    }
}
