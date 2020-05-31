import { FormControl } from '@angular/forms';

export class ShoppingEditValidator {
    static amountValidator(control: FormControl): {[s: string]: boolean} {
        const regexp: RegExp = new RegExp('^[1-9]+[0-9]*$');

        if(control.value !== null && !regexp.test(control.value)) {
            return {'notValidAmount': true};
        }

        return null;
    }

    static maxAmountValueValidator(control: FormControl): {[s: string]: boolean} {
        const amountValue: any = control.value;

        if(amountValue !== null && +amountValue > 999999) {
            return {'notValidMaxAmountValue': true}
        }

        return null;
    }
}