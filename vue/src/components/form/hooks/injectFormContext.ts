import { inject } from 'vue';
import { injectFormKey, injectFormType } from '../types';

const useInjectFormContext = (): injectFormType => {
    const form = inject(injectFormKey);
    return form as injectFormType;
};

export default useInjectFormContext;
