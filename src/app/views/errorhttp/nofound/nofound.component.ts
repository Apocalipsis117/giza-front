import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nofound',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nofound.component.html'
})
export class NofoundComponent {

}
