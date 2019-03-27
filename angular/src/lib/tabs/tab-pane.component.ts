import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';

@Component({
  selector: 'cui-tab-pane',
  template: `
    <div class="cui-tab__content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class TabPaneComponent implements OnInit {
  @HostBinding('class') get className(): string {
    return 'cui-tab__pane' + `${(this.ifCurrent && ' active') || ''}` + ``;
  }

  private tabIndex: number;
  private ifCurrent: boolean;

  constructor(private tabsService: TabsService) {
    this.tabIndex = tabsService.registerPane();
    this.tabsService.current$.subscribe(currentIndex => {
      this.ifCurrent = this.tabIndex === currentIndex;
    });
  }

  ngOnInit() {}
}
