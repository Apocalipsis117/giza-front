export interface Steps {
    data: DataSteps;
}

export interface DataSteps {
    steps: StepSteps[];
}

export interface StepSteps {
    id:      number;
    display: LangsSteps[];
}

export interface LangsSteps {
    lang:  string;
    title: string;
}
