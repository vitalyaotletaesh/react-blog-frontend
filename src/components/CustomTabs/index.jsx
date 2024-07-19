import { Tab, Tabs } from '@mui/material'

export const CustomTabs = ({ tabs, onClick, selectedIndex }) => {
	return (
		<Tabs
			style={{ marginBottom: 15 }}
			value={tabs.indexOf(selectedIndex)}
			aria-label='basic tabs example'
		>
			{tabs ? (
				tabs.map((tab, i) => (
					<Tab key={i} label={tab} onClick={() => onClick(tab)} />
				))
			) : (
				<></>
			)}
		</Tabs>
	)
}
