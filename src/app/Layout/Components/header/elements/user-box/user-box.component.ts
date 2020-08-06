import {Component, OnInit, Input} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';
//import {MenuItems} from '../menu-items/menu-items';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import { FormationService } from 'src/app/DemoPages/shared/formation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { UserService } from './../../shared/user.service';
//import { UserService } from 'architectui-angular-free-theme/src/app/DemoPages/shared/user.service.ts';
@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '300px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})

export class UserBoxComponent implements OnInit {
  

  constructor(public globals: ThemeOptions,private modalService: NgbModal, private router: Router,public formation: FormationService) {
    for(var element in this.formation.besoins){
      this.sum
    }
    
    

  }
 
@Input()  sum=5
ValueChange(event){
  this.sum=event.target.value;
  console.log( this.sum);
}
  ngOnInit() {
    this.formation.GetAllBesoinCollecte();
 
 
  }
  
  domaineId:number
 
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['pages/login-boxed']);
  }
  formatsDateTest: string[] = [
    'dd/MM/yyyy',
    
    ];

    openCentred(content) {
      this.modalService.open(content, { centered: true });
    }
    openSmall(content) {
      this.modalService.open(content, {
        size: 'sm'
      });
    }
    openLarge(content) {
      this.modalService.open(content, {
        size: 'lg'
      });
    }


}
