import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchControl = new FormControl('');
  locationFields = [
    { label: 'Hanoi', controlName: 'hanoi', visible: true },
    { label: 'Saigon', controlName: 'saigon', visible: false }
  ];
}
