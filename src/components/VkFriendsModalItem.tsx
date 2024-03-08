import { Div, ModalPage } from '@vkontakte/vkui';
import { User } from '../types/groups.type';

interface VkFriendsModalItemProps {
	setActiveModal: (modal: string | null) => void;
	friends: User[];
	id: string;
}

const VkFriendsModalItem = ({
	id,
	setActiveModal,
	friends,
}: VkFriendsModalItemProps) => {
	return (
		<ModalPage
			id={id}
			dynamicContentHeight
			onClose={() => setActiveModal(null)}
		>
			{friends.map((friend) => {
				return (
					<Div key={friend.first_name + friend.last_name + id}>
						{friend.first_name + ' ' + friend.last_name}
					</Div>
				);
			})}
		</ModalPage>
	);
};

export default VkFriendsModalItem;

