import { ModalRoot } from '@vkontakte/vkui';
import VkFriendsModalItem from './VkFriendsModalItem';
import { Group as GroupType } from '../types/groups.type';

interface VkFriendsModalListProps {
	setActiveModal: (modal: string | null) => void;
	data: GroupType[] | undefined;
	activeModal: string | null;
}

const VkFriendsModalList = ({
	data,
	activeModal,
	setActiveModal,
}: VkFriendsModalListProps) => {
	return (
		<>
			{data?.map((simpleData) => {
				return (
					simpleData.friends && (
						<ModalRoot
							key={simpleData.id}
							activeModal={activeModal}
							onClose={() => setActiveModal(null)}
						>
							<VkFriendsModalItem
								friends={simpleData.friends}
								id={`modal-${simpleData.id}`}
								setActiveModal={setActiveModal}
							/>
						</ModalRoot>
					)
				);
			})}
		</>
	);
};

export default VkFriendsModalList;

