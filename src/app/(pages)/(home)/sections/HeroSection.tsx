const HeroSection = ({
  desktopUrl,
  mobileUrl,
}: {
  desktopUrl: string;
  mobileUrl: string;
}) => {
  //
  const isVideo = desktopUrl?.match(/\.(mp4|mov|avi)$/i);

  return (
    <section className="w-full h-full min-h-[82vh] relative">
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/keyprocedures.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={desktopUrl} media="(min-width: 601px)" />
          <source src={mobileUrl} media="(max-width: 600px)" />
        </video>
      ) : (
        <picture>
          <source srcSet={mobileUrl} media="(max-width: 600px)" />
          <source srcSet={desktopUrl} media="(min-width: 601px)" />
          <img
            src={desktopUrl}
            alt="hero-section-image"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </picture>
      )}
    </section>
  );
};

export default HeroSection;
