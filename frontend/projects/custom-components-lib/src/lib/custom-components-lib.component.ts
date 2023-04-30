import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-custom-components-lib',
  template: `
    <p>
      custom-components-lib works!
    </p>
  `,
  styles: [
  ]
})
export class CustomComponentsLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
