import { bootstrapApplication } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Block Release Clicker</h1>

    <div id="game">
      <div id="game_container">
        <div id="text_container">
          <p class="text">Mails = {{ mail() }}</p>
          <p class="text">Total CPS = {{ cps_user() + cps_object }}</p>
        </div>
        <span><button class="click_button" (click) = "add_mail()" (click) = "process_cps()"> {{ click_button_text }}</button></span>
      </div>

      <div id="object_container">
        <div id="element" class="object">
          <span>
            <button class="object_button" [disabled]="is_buyable('cursor')" (click) = "buy('cursor')">
              <p>Cursor lvl {{ object['cursor'][2] }}</p>
              <p>Cost : {{ object['cursor'][0] }}</p>
            </button>
          </span>
          <span>
            <button class="object_button" [disabled]="is_buyable('student')" (click) = "buy('student')">
              <p>Student lvl {{ object['student'][2] }}</p>
              <p>Cost : {{ object['student'][0] }}</p>
            </button>
          </span>
          <span>
            <button class="object_button" [disabled]="is_buyable('coach')" (click) = "buy('coach')">
              <p>Coach lvl {{ object['coach'][2] }}</p>
              <p>Cost : {{ object['coach'][0] }}</p>
            </button>
          </span>
          <span>
            <button class="object_button" [disabled]="is_buyable('ai')" (click) = "buy('ai')">
              <p>Ai lvl {{ object['ai'][2] }}</p>
              <p>Cost : {{ object['ai'][0] }}</p>
            </button>
          </span>
        </div>
      </div> 
    </div>
  `
})

export class App {
  cps_object = 0;
  mail = signal(0);
  cps_user = signal(0);
  running = false;

  click_button_text = "Send an email";

  private timer : any;

  object: Record<string, Array<number>> = {
    'cursor': [10, 1, 1],
    'student': [100, 2, 0],
    'coach': [1000, 10, 0],
    'ai': [5000, 25, 0]
  };

  process_cps() {
    if (this.running) return;
    this.running = true;
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.mail.update((mail) => mail + this.cps_object);
      this.cps_user.set(0)
      this.running = false
    }, 1000)
  }

  add_mail() {
    this.mail.update((mail) => mail + this.object['cursor'][2]);
    this.cps_user.update((cps_user) => cps_user + this.object['cursor'][2]);
  }

  is_buyable(object_name: string) {
    if (this.mail() < this.object[object_name][0]) {
      return true;
    }
    return false;
  }

  buy(object_name: string) {
    this.mail.update((mail) => mail - this.object[object_name][0]);
    this.object[object_name][0] = Math.round(this.object[object_name][0] * 1.5);
    this.object[object_name][2] = Math.round(this.object[object_name][2] += 1);
    if (object_name != "cursor") {
      this.cps_object += this.object[object_name][1];
    }
  }
}

bootstrapApplication(App);