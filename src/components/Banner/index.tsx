import BannerMain from '../../assets/imgs/banner.png';
import Banner2x from '../../assets/imgs/banner-2x.png';
import BannerSm from '../../assets/imgs/banner-sm.png';
import BannerSm2x from '../../assets/imgs/banner-sm-2x.png';
import styles from './index.module.scss';

const Banner = () => (
  <picture>
    <source media="(min-width: 800px)" srcSet={`${BannerMain} 1x, ${Banner2x} 2x`} />
    <source media="(min-width: 400px)" srcSet={`${BannerSm} 1x, ${BannerSm2x} 2x`} />
    <img
      className={styles.banner}
      src={BannerMain}
      alt="Rick and Morty logo"
      width={800}
      height={250}
    />
  </picture>
);

export default Banner;
