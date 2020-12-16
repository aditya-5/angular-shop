import { Directive , HostListener, HostBinding} from "@angular/core"

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective{
  // constructor(private elRef: ElementRef,private  renderer: Renderer2)
  @HostBinding('class.open') isOpen = false;
  @HostListener('mouseenter') toggleOpen(eventData: Event){
    this.isOpen = true
  }
  @HostListener('mouseleave') toggleClose(eventData: Event){
    this.isOpen = false
  }
}
