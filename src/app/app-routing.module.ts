import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

// Pages
import { WaitingRegistrationBoxedComponent} from './DemoPages/UserPages/waiting-registration-boxed/waiting-registration-boxed.component';
import {ForgotPasswordBoxedComponent} from './DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component';
import {LoginBoxedComponent} from './DemoPages/UserPages/login-boxed/login-boxed.component';
import {RegisterBoxedComponent} from './DemoPages/UserPages/register-boxed/register-boxed.component';

// Elements

import {StandardComponent} from './DemoPages/Elements/Buttons/standard/standard.component';
import {DropdownsComponent} from './DemoPages/Elements/need-training/dropdowns.component';
import {CardsComponent} from './DemoPages/Elements/cards/cards.component';
import {ListGroupsComponent} from './DemoPages/Elements/list-groups/list-groups.component';
import {TimelineComponent} from './DemoPages/Elements/timeline/timeline.component';
import {IconsComponent} from './DemoPages/Elements/need_collected_year/icons.component';

// Components
//import { WaitingRegistrationBoxedComponent} from './DemoPages/Components/waiting-registration-boxed/waiting-registration-boxed.component';
import {AccordionsComponent} from './DemoPages/Components/accordions/accordions.component';
import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import {EvaluationComponent} from './DemoPages/Components/evaluation/evaluation.component';
import {EvaluationDAComponent} from './DemoPages/Components/evaluation-da/evaluation-da.component';
import {CarouselComponent} from './DemoPages/Components/carousel/carousel.component';
import {ModalsComponent} from './DemoPages/Components/modals/modals.component';
import {UsersListesComponent} from './DemoPages/Components/users-listes/users-listes.component';
import {ProgressBarComponent} from './DemoPages/Components/progress-bar/progress-bar.component';
import {PaginationComponent} from './DemoPages/Components/pagination/pagination.component';
import {TooltipsPopoversComponent} from './DemoPages/Components/tooltips-popovers/tooltips-popovers.component';

// Tables
import {ActiviteComponent} from './DemoPages/Tables/activite/activite.component';
import {TablesMainComponent} from './DemoPages/Tables/tables-main/tables-main.component';
import {ChoixActiviteComponent}from './DemoPages/Tables/choix-activite/choix-activite.component';
// Widgets

import {ChartBoxes3Component} from './DemoPages/Widgets/chart-boxes3/chart-boxes3.component';

// Forms Elements

import {ControlsComponent} from './DemoPages/Forms/Elements/controls/controls.component';
import {LayoutComponent} from './DemoPages/Forms/Elements/layout/layout.component';

// Charts

import {ChartjsComponent} from './DemoPages/Charts/chartjs/chartjs.component';

const routes: Routes = [
  {path:'',redirectTo:'pages/login-boxed',pathMatch:'full'},
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads

      {path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}},

      // Elements

      {path: 'elements/Send-Email', component: StandardComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/need-training', component: DropdownsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/Training-need-collected-in-year', component: IconsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/cards', component: CardsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/list-group', component: ListGroupsComponent, data: {extraParameter: 'elementsMenu'}},
      {path: 'elements/timeline', component: TimelineComponent, data: {extraParameter: 'elementsMenu'}},

      // Components
      {path: 'components/evaluation', component: EvaluationComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/evaluation-da', component: EvaluationDAComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/accordions', component: AccordionsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/modals', component: ModalsComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/progress-bar', component: ProgressBarComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/tooltips-popovers', component: TooltipsPopoversComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/carousel', component: CarouselComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/pagination', component: PaginationComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'components/users-listes', component: UsersListesComponent, data: {extraParameter: 'componentsMenu'}},
     // {path: 'components/waiting-registration-boxed', component: WaitingRegistrationBoxedComponent, data: {extraParameter: 'componentsMenu'}},
      // Tables

      {path: 'tables/bootstrap', component: TablesMainComponent, data: {extraParameter: 'tablesMenu'}},
      {path: 'tables/activite', component: ActiviteComponent, data: {extraParameter: 'componentsMenu'}},
      {path: 'tables/choix-activite', component: ChoixActiviteComponent, data: {extraParameter: 'componentsMenu'}},
      // Widgets

      {path: 'widgets/chart-boxes-3', component: ChartBoxes3Component, data: {extraParameter: 'pagesMenu3'}},

      // Forms Elements

      {path: 'forms/controls', component: ControlsComponent, data: {extraParameter: 'formElementsMenu'}},
      {path: 'forms/layouts', component: LayoutComponent, data: {extraParameter: 'formElementsMenu'}},

      // Charts

      {path: 'charts/chartjs', component: ChartjsComponent, data: {extraParameter: ''}},

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages

      {path: 'pages/login-boxed', component: LoginBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/register-boxed', component: RegisterBoxedComponent, data: {extraParameter: ''}},
      {path: 'pages/forgot-password-boxed', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
     {path: 'pages/waiting-registration-boxed', component: WaitingRegistrationBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()


  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
