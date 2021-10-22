import withInstallFn from '@/utils/with-install';
import Message from './message';

const withInstallMessage = withInstallFn(Message, '$message');

export default withInstallMessage;
