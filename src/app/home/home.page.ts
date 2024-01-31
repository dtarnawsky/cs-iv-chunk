import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { VaultService } from '../vault.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(private vs: VaultService) { }

  message = '';
  key = 'large-data';
  largeData = '';

  getLargeData() {
    if (this.largeData == '') {
      while (this.largeData.length < 1000000) {
        this.largeData = this.largeData + Math.random().toString();
      }
    }
    return this.largeData;
  }

  async testWrite() {
    this.message = 'fetching data....';
    const text = this.getLargeData();
    this.message = 'setting data....';
    try {
      console.time('set');
      await this.vs.vault.setValue(this.key, text);
      console.timeEnd('set');
      this.message = 'locking....';
      this.vs.vault.lock();
      this.message = `done. ${text.length} bytes.`;
      console.log(`${text.length} bytes wrote.`);
    } catch (err) {
      alert(`Failed ${err}`);
    }

  }

  async testRead() {
    this.message = 'fetching data....';
    const expectedText = this.getLargeData();

    try {
      console.time('get');
      const text = await this.vs.vault.getValue(this.key);
      console.timeEnd('get');
      this.message = 'done.';
      console.log(`${text.length} bytes read. success=${text == expectedText}`);
      if (text != expectedText) {
        console.log('expected');
        console.log(expectedText);
        console.log('got');
        console.log(text);
        alert('Crap: we broke it Yo! 🔥🔥🔥🔥🔥🔥');
      } else {
        alert('Write/Read is nominal 😀');
      }
    } catch (err) {
      alert(`Failed ${err}`);
    }

  }
}
