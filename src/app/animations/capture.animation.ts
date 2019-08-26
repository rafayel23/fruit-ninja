import { trigger, style, transition, animate, state } from '@angular/animations'


export const Capture = [

    trigger('capture', [

        state('true', style({
            opacity: 0,
            transform: 'scale(0) rotate(540deg) translateY(-20px)',
        })),

        transition('* => true', [
            animate('300ms')
        ]),
    ]),
]
