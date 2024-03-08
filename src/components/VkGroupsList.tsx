import { Div, Group, Header } from '@vkontakte/vkui';
import VkGroupItem from './VkGroupItem';
import { Group as GroupType } from '../types/groups.type';

interface VkGroupsListProps {
	setActiveModal: (modal: string | null) => void;
	data: GroupType[] | undefined;
}

const VkGroupsList = ({ data, setActiveModal }: VkGroupsListProps) => {
	return (
		<Group header={<Header>Группы</Header>} style={{ margin: '0 30px' }}>
			<>
				{data?.length ? (
					data?.map((simpleData) => (
						<VkGroupItem
							key={simpleData.id}
							simpleData={simpleData}
							setActiveModal={setActiveModal}
						/>
					))
				) : (
					<Div>Нет подходящих групп</Div>
				)}
			</>
		</Group>
	);
};

export default VkGroupsList;

