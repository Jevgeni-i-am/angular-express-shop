import {ElementRef} from "@angular/core";

declare var M
// MaterialService.toast(error.error.message)
// Вывод ошибки, взятой из консоли,  в красивом окошке

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }


  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
  }
}


