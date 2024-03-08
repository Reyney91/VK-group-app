import { SimpleCell, Avatar, CardGrid } from '@vkontakte/vkui';
import { Group } from '../types/groups.type';

interface VkGroupItemProps {
	simpleData: Group;
	setActiveModal: (modal: string | null) => void;
}

const VkGroupItem = ({ simpleData, setActiveModal }: VkGroupItemProps) => {
	return (
		<SimpleCell
			key={simpleData.id}
			before={
				<Avatar
					sizes={'100px'}
					gradientColor='custom'
					style={{ backgroundColor: simpleData.avatar_color }}
				/>
			}
			expandable='auto'
			subtitle={
				<>
					{simpleData.closed ? 'Закрытая' : 'Открытая'}
					<CardGrid style={{ padding: 0 }}>
						{simpleData.friends && (
							<>
								<span
									className='friends-button'
									onClick={() => setActiveModal(`modal-${simpleData.id}`)}
								>
									{simpleData.friends.length} друзей
								</span>
							</>
						)}

						{simpleData.members_count + ' подписчиков'}
					</CardGrid>
				</>
			}
		>
			{simpleData.name}
		</SimpleCell>
	);
};

export default VkGroupItem;

