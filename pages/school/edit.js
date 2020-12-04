import Chat from '../../components/Chat';
import { PrivateRoute } from '../../components/PrivateRoute';


const ChatPage = () => <Chat />;

export default PrivateRoute(ChatPage);
