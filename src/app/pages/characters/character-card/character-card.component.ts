import { Component, Input } from '@angular/core';
import { Character } from '../../../interface/character.interface';


@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character!: Character; 
  @Input() isAdmin!: boolean;
  @Input() getStatusColor!: (status: string) => string;

}


