import {ElementRef} from "@angular/core";

declare var M

export interface MaterialInstance {
  open?():void
  close?():void
  destroy?():void
  }
// MaterialService.toast(error.error.message)
// Вывод ошибки, взятой из консоли,  в красивом окошке

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }


  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

//Оживление инпутов
  static updateTextInputs() {
    M.updateTextFields()
  }

  //
  static initModal(ref: ElementRef):MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }
}


