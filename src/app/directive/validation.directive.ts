import { Directive, ElementRef, HostListener } from '@angular/core';
import { Input } from "@angular/core";

@Directive({
 selector: '[validateInput]'
})

export class ValidationDirective {
  @Input() restrict: string;
 // Allow decimal numbers and negative values
 regObj = {
   number : new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g),
   alpha : new RegExp(/^[a-zA-Z]+$/)
 };
//  private regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
 // Allow key codes for special events. Reflect :
 // Backspace, tab, end, home
 private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];

constructor(private el: ElementRef) {
 }
 @HostListener('keydown', [ '$event' ])
 onKeyDown(event: KeyboardEvent) {
 // Allow Backspace, tab, end, and home keys
 if (this.specialKeys.indexOf(event.key) !== -1) {
 return;
 }
 let current: string = this.el.nativeElement.value;
 let next: string = current.concat(event.key);
 if (next && !String(next).match(this.regObj[this.restrict])) {
 event.preventDefault();
 }  
 }
}
