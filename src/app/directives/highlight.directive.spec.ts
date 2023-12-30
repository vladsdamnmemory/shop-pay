import {HighlightDirective} from './highlight.directive';
import {ChangeDetectorRef} from "@angular/core";
import {ProductsFilterService} from "../services/products-filter/products-filter.service";

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let changeDetectorRefMock: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    changeDetectorRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const filterService = new ProductsFilterService();
    directive = new HighlightDirective(changeDetectorRefMock, filterService);
  });

  it('should create an instance of the directive', () => {
    expect(directive).toBeTruthy();
  });

});
