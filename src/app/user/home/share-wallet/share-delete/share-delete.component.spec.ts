import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDeleteComponent } from './share-delete.component';

describe('ShareDeleteComponent', () => {
  let component: ShareDeleteComponent;
  let fixture: ComponentFixture<ShareDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
