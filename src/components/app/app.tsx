import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleApplyButton = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	const handleResetButton = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApplyButton}
				onReset={handleResetButton}
				initialState={articleState}
			/>
			<Article />
		</main>
	);
};
