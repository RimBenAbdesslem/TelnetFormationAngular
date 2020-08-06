import { Pipe,PipeTransform, Component } from '@angular/core';
import { Participant } from '../../Models/participant.model';


@Pipe({
    name: 'participantFilter'
  })
export class ParticipantFilterPipe implements PipeTransform {
    transform(participans: Participant[], searchTerm: string): Participant[] {

      if (!searchTerm) {
        return participans;
       }
 if (participans || searchTerm) {
    return participans;
}
return participans.filter(Participant => 
    Participant.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1
    );

//searchText = searchText.toLocaleLowerCase();

//return items.filter(it => {
//  return it.toLocaleLowerCase().includes(searchText);
//});


    }
}