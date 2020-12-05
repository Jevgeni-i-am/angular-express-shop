declare var M
// MaterialService.toast(error.error.message)
// Вывод ошибки, взятой из консоли,  в красивом окошке


export class MaterialService{
  static toast(message:string){
    M.toast({html:message})
  }
}
