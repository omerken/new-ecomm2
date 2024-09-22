import '~/styles/common.scss';
import { createBoard, Variant } from '@wixc3/react-board';
import styles from './typography.board.module.scss';
import classNames from 'classnames';

export default createBoard({
    name: 'Typography',
    Board: () => (
        <div className={styles.container}>
            <div>
                <span className={styles.uikit}>UI Kit</span>
                <span className={styles.foundation}> | Foundation</span>
                <hr className={styles.hrSolid} />
                <h3 className={styles.sectionTitle}>Typography</h3>
                <h4 className={styles.sectionHeader}>DISPLAY</h4>
            </div>
            <Variant name="Heading1">
                <h1 className="heading1">Heading 1</h1>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading1: <span className={styles.fontDetails}>Marcellus / 80px / 1</span>
            </p>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>HEADING</h4>
            <Variant name="Heading2">
                <h2 className="heading2">Heading 2</h2>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading2: <span className={styles.fontDetails}> Marcellus / 55px / 1.1</span>
            </p>
            <Variant name="Heading3">
                <h3 className="heading3">Heading 3</h3>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading3: <span className={styles.fontDetails}>Marcellus / 42px / 1.2</span>
            </p>
            <Variant name="Heading4">
                <h4 className="heading4">Heading 4</h4>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading4: <span className={styles.fontDetails}> Marcellus / 40px / 1.2</span>
            </p>
            <Variant name="Heading5">
                <h5 className="heading5">Heading 5</h5>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading5: <span className={styles.fontDetails}> Marcellus / 20px / 1.3</span>
            </p>
            <Variant name="Heading6">
                <h6 className="heading6">Heading 6</h6>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading6: <span className={styles.fontDetails}>Figtree (400) / 20px / 1.4</span>
            </p>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>PARAGRAPH</h4>

            <Variant name="Paragraph1">
                <p className="paragraph1">
                    We ignite opportunity by setting the world in motion. 0123456789
                </p>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --paragraph1: <span className={styles.fontDetails}>Figtree (400) / 20px / 1.4</span>
            </p>
            <Variant name="Paragraph2">
                <p className="paragraph2">
                    We ignite opportunity by setting the world in motion. 0123456789
                </p>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --paragraph2: <span className={styles.fontDetails}>Figtree (400) / 20px / 1.4</span>
            </p>
            <Variant name="Paragraph3">
                <p className="paragraph3">
                    We ignite opportunity by setting the world in motion. 0123456789
                </p>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --paragraph3: <span className={styles.fontDetails}>Figtree (400) / 20px / 1.4</span>
            </p>
        </div>
    ),
    environmentProps: {
        windowWidth: 450,
        windowHeight: 460,
    },
    isSnippet: true,
});
