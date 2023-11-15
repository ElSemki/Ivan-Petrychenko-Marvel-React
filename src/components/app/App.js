import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
// import { ComicsPage, MainPage, SingleComicPage } from '../pages';
import Spinner from '../spinner/Spinner.js';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const singleCharLayout = lazy(() =>
	import('../pages/singleCharLayout/SingleCharLayout')
);
const singleComicLayout = lazy(() =>
	import('../pages/singleComicLayout/SingleComicLayout')
);
const SinglePage = lazy(() => import('../pages/SinglePage'));
const Page404 = lazy(() => import('../pages/404'));

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/comics" element={<ComicsPage />} />
							<Route
								path="/comics/:id"
								element={
									<SinglePage Component={singleComicLayout} dataType="comic" />
								}
							/>
							<Route
								path="/characters/:id"
								element={
									<SinglePage
										Component={singleCharLayout}
										dataType="character"
									/>
								}
							/>
							<Route path="*" element={<Page404 />}></Route>
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
