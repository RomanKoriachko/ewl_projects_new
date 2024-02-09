import './Main.scss'
import Projects from 'components/mainComponents/Projects/Projects'
import SearchAndFilter from 'components/mainComponents/SearchAndFilter/SearchAndFilter'
import { useAppSelector } from 'redux/hooks'
// import SliderComponent from 'components/mainComponents/SliderComponent/SliderComponent'
import StickyBox from 'react-sticky-box'
import TabletFilter from 'components/mainComponents/TabletFilter/TabletFilter'
import MapComponent from 'components/mainComponents/MapComponent/MapComponent'

type Props = {}

const Main = (props: Props) => {
    const darkThemeState = useAppSelector((state) => state.darkThemeState)

    return (
        <main className={`main ${darkThemeState.main}`}>
            <>
                {/* <SliderComponent /> */}
                <MapComponent />
                <div className="container">
                    <div className="main-content">
                        <StickyBox
                            className="sidebar"
                            offsetTop={20}
                            offsetBottom={20}
                        >
                            <SearchAndFilter />
                        </StickyBox>
                        <TabletFilter />
                        <Projects />
                    </div>
                </div>
            </>
        </main>
    )
}

export default Main
