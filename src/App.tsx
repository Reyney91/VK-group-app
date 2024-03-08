import { useEffect, useMemo, useState } from 'react';
import { Group as GroupType } from './types/groups.type';
import {
	Button,
	Group,
	PanelHeader,
	Placeholder,
	ScreenSpinner,
} from '@vkontakte/vkui';
import VkGroupsList from './components/VkGroupsList';
import VkFriendsModalList from './components/VkFriendsModalList';
import { FiltersType } from './types/filters.type';
import VkGroupsFilters from './components/VkGroupsFilters';
import { groupsService } from './api/groups.service';

function App() {
	const [data, setData] = useState<GroupType[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [filters, setFilters] = useState<FiltersType>({
		privateType: 'all',
		color: 'all',
		friends: false,
	} as FiltersType);

	const [activeModal, setActiveModal] = useState<string | null>(null);

	const colors = useMemo(
		() =>
			Array.from(
				new Set(
					data
						?.map((simpleData) => simpleData.avatar_color!)
						.filter((color) => color !== undefined)
				)
			),
		[data]
	);

	const filteredByColorsData: GroupType[] | undefined = useMemo(() => {
		return data?.filter((simpleData) => {
			if (filters.color !== 'all') {
				return simpleData.avatar_color == filters.color;
			} else return data;
		});
	}, [filters, data]);
	const filteredByColorsAndTypeData: GroupType[] | undefined = useMemo(() => {
		return filteredByColorsData?.filter((simpleData) => {
			if (filters.privateType == 'close') {
				return simpleData.closed == true;
			} else if (filters.privateType == 'open') {
				return simpleData.closed == false;
			} else return filteredByColorsData;
		});
	}, [filters, filteredByColorsData]);
	const filteredByColorsTypeAndFriendsData: GroupType[] | undefined =
		useMemo(() => {
			return filteredByColorsAndTypeData?.filter((simpleData) => {
				if (filters.friends == true) {
					return simpleData.friends;
				} else return filteredByColorsAndTypeData;
			});
		}, [filters, filteredByColorsAndTypeData]);

	async function fetchGroups() {
		setIsLoading(true);
		const groups = await groupsService.loadItem();
		setIsLoading(false);
		if (groups.result) {
			setData(groups.data);
		}
	}

	useEffect(() => {
		fetchGroups();
	}, []);

	return (
		<>
			<PanelHeader>Сообщества</PanelHeader>
			{isLoading ? (
				<ScreenSpinner state='loading' />
			) : data ? (
				<>
					<VkGroupsFilters setFilters={setFilters} colors={colors} />
					<VkGroupsList
						data={filteredByColorsTypeAndFriendsData}
						setActiveModal={setActiveModal}
					/>
					<VkFriendsModalList
						activeModal={activeModal}
						data={data}
						setActiveModal={setActiveModal}
					/>
				</>
			) : (
				<Group>
					<Placeholder
						header='Ошибка при получении данных групп'
						action={
							<Button onClick={fetchGroups} size='m'>
								Загрузить снова
							</Button>
						}
					>
						Попробуйте снова загрузить данные о группах
					</Placeholder>
				</Group>
			)}
		</>
	);
}

export default App;

