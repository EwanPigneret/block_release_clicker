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
      <div id="container_1" class="click_per_second">
        <p>CPS = {{ CPS }}</p>
        <span><button class="click_button" (click) = "add_mail()"> {{ click_button_text }}</button></span>
      </div>

      <div id="container_2" class="game_element">
        <div id="element_2" class="object">
          <span><button>Cursor</button></span>
          <span><button>Student</button></span>
        </div>
      </div> 
    </div>
  `
})

export class App {
  mail = 0;
  CPS = 0;

  click_button_text = "Send an email"

  add_mail() {
    this.mail += 1
    // TODO : add user click per second + object & cursor CPS
    // this.CPS = 
  }
}

bootstrapApplication(App);