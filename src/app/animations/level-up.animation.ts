import { trigger, style, transition, animate } from '@angular/animations'


export const Levelup = [

    trigger('levelup', [
        transition(':enter', [
            style({ opacity: 0.2 , transform: 'translateY(-30px)'}),
            animate('0.3s', style({ opacity: 1 , transform: '*'})),
        ]),
        transition(':leave', [
            animate('0.3s', style({ opacity: 0.2 , transform: 'translateY(30px)'}))
        ])
    ]),
]
