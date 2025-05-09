import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[highlightInvalid]',
  standalone: true,
})
export class HighlightInvalidDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit(): void {
    this.control.valueChanges?.subscribe(() => {
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        this.el.nativeElement.style.border = '2px solid red';
      } else {
        this.el.nativeElement.style.border = '';
      }
    });
  }
}