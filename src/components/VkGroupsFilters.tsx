import {
	Group,
	Header,
	FormLayoutGroup,
	FormItem,
	Select,
	Checkbox,
} from '@vkontakte/vkui';
import { FiltersType } from '../types/filters.type';

type VkGroupsFiltersProps = {
	colors: string[];

	setFilters: (prev: any) => void;
};

const VkGroupsFilters = ({ colors, setFilters }: VkGroupsFiltersProps) => {
	return (
		<Group header={<Header>Фильтры</Header>} style={{ margin: '0 30px' }}>
			<FormLayoutGroup mode='horizontal'>
				<FormItem top='Тип приватности'>
					<Select
						onChange={(event) => {
							setFilters((prev: FiltersType) => {
								return {
									...prev,
									privateType: event.target.value,
								};
							});
						}}
						defaultValue={'all'}
						options={[
							{ label: 'Все', value: 'all' },
							{ label: 'Открытая', value: 'open' },
							{ label: 'Закрытая', value: 'close' },
						]}
					/>
				</FormItem>
				<FormItem top='Цвет аватарки'>
					<Select
						onChange={(event) => {
							setFilters((prev: FiltersType) => {
								return {
									...prev,
									color: event.target.value,
								};
							});
						}}
						defaultValue={'all'}
						options={[
							{ label: 'Все', value: 'all' },
							...colors.map((color) => {
								return { label: color, value: color };
							}),
						]}
					/>
				</FormItem>
			</FormLayoutGroup>

			<Checkbox
				onChange={(event) => {
					setFilters((prev: FiltersType) => {
						return {
							...prev,
							friends: !!event.target.checked,
						};
					});
				}}
			>
				Друзья в группе
			</Checkbox>
		</Group>
	);
};

export default VkGroupsFilters;

