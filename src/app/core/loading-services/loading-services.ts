import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingServices {
  private _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  private timeoutId: any = null;

  show() {
    // إلغاء المؤقت القديم إذا كان موجودًا
    this.clearTimeout();

    this._loading.set(true);

    // إخفاء المؤشر تلقائيًا بعد 30 ثانية (حماية ضد التحميل المستمر)
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, 90000);
  }

  hide() {
    this._loading.set(false);
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
