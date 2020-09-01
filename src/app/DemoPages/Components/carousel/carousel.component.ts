import {Component} from '@angular/core';
import { DirecteureActiviteCompetenceService } from '../../shared/DirecteureActiviteCompetence.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {

  heading = 'Carousels & Slideshows';
  subheading = 'Create easy and beautiful slideshows with these Vue components.';
  icon = 'pe-7s-album icon-gradient bg-sunny-morning';

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  slides = [
    {img: '1'},
    {img: '2'},
    {img: '3'},
    {img: '4'},
    {img: '5'},
    {img: '6'},
    {img: '7'},
    {img: '8'},

  ];
  slideConfig = {
    slidesToShow: 1,
    dots: true,
  };

  slideConfig2 = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    dots: true,
  };

  slideConfig3 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  slideConfig4 = {
    slidesToShow: 3,
    dots: true,
  };

  slideConfig5 = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  slideConfig6 = {
    className: 'center',
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };
  constructor(public competence: DirecteureActiviteCompetenceService) {
  }
//ici lazem je recupeer l'id de user connecté
//puis j'affiche le matrice par domaine
users = JSON.parse(localStorage.getItem('users')) ;
payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
tabLabActivite:any[];
ngOnInit(){
  this.competence.getListeActivite(this.payLoad.UserID);
  this.competence.getlisteuser(this.payLoad.UserID);
  this.competence.getAllActivite(this.payLoad.UserID);
  this.competence.getActiviteMetierUser(this.payLoad.UserID);
  this.competence.get(this.payLoad.UserID);
  this.competence.AllActiviteMetier.map(p =>{
    console.log(this.tabLabActivite.indexOf(p));
    if(this.tabLabActivite.indexOf(p.userId) ==this.payLoad.UserID  ) 
    this.tabLabActivite.push(p.activiteId);
 console.log(this.tabLabActivite)
  })  
  for(var i in this.competence.AllActiviteMetier){
    if(this.competence.AllActiviteMetier[i].userId==this.payLoad.UserID){

    }
  }
  this.competence.GetDomaineActivite(this.payLoad.UserID);
  this.competence.GetLabel(this.payLoad.UserID);
  this.competence.GetAllActiviteMetier();

}
changeSelectActivite(user,label,niveau){
  console.log("user :  ",user)
  console.log("label :  ",label)
  niveau = Number(niveau)
  console.log("niveau :  ",niveau)

  let level = user.Level.find(x=>x.labelId == label.labelId)
  let activMetId = level? level.activMetId : null
  console.log("metierId : ",activMetId);

  this.competence.editLevelActivite(activMetId,niveau)
  .subscribe(res=>{
    console.log("res : ",res)
  })
  

}
getchoixUserLabelSumActivite(user,domaine,activite)
{
//   console.log(user.id);
//  console.log(activMetId);

    for(var i in this.competence.listeMetierActivite){
    
    if(this.competence.listeMetierActivite[i].activiteId==activite.id && this.competence.listeMetierActivite[i].domaineId== domaine.domaineId && this.competence.listeMetierActivite[i].userId==user.id){
   // console.log(this.competence.AllActiviteMetier[i].niveau)
        if (user.Level){
          let res = user.Level.find(x=>x.labelId == domaine.labelId )
      console.log(res);
          return res? res.niveau : 0
        }else{
          return 0
        }
     
     
    }
     
    }}



}
