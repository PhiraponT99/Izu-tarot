import { ENABLE_TAROT_TEST_MODE } from '../config/featureFlags';
import type { IzuThreeCardReflection } from '../utils/izuThreeCardReflection';

interface IzuReflectionBubbleProps {
  reflection: IzuThreeCardReflection;
}

interface ReflectionContentProps extends IzuReflectionBubbleProps {
  titleId: string;
}

const ReflectionContent: React.FC<ReflectionContentProps> = ({ reflection, titleId }) => (
  <>
    <h3
      id={titleId}
      className="mb-2 font-cinzel text-xs uppercase tracking-widest text-gold sm:text-sm"
    >
      {reflection.title}
    </h3>
    <p className="whitespace-pre-line font-inter text-sm font-normal leading-6 text-slate-100 sm:text-base sm:leading-7">
      {reflection.message}
    </p>
    {ENABLE_TAROT_TEST_MODE && (
      <p className="mt-3 border-t border-purple-light/15 pt-2 font-inter text-[9px] uppercase tracking-wider text-purple-light/60 sm:text-[10px]">
        Matched reflection group: {reflection.group}
      </p>
    )}
  </>
);

const IzuReflectionBubble: React.FC<IzuReflectionBubbleProps> = ({ reflection }) => (
  <div className="mx-auto w-full max-w-[720px]">
    {/* On phones, keep the full mascot visible and give the longer copy its own readable panel. */}
    <section aria-labelledby="izu-reflection-title-mobile" className="sm:hidden">
      <img
        src="/ui/izu-message-bubble.png"
        alt="Izu message bubble"
        className="h-auto w-full"
      />
      <div className="-mt-5 rounded-xl border border-purple-light/20 bg-[#17183f]/95 px-4 py-4 shadow-[0_0_24px_rgba(124,58,237,0.18)]">
        <ReflectionContent
          reflection={reflection}
          titleId="izu-reflection-title-mobile"
        />
      </div>
    </section>

    {/* The desktop artwork has enough room to hold the reflection inside its speech area. */}
    <section
      aria-labelledby="izu-reflection-title-desktop"
      className="relative hidden sm:block"
    >
      <img
        src="/ui/izu-message-bubble.png"
        alt="Izu message bubble"
        className="h-auto w-full"
      />
      <div className="absolute bottom-[22%] left-[11%] right-[22%] top-[15%] flex flex-col justify-center px-4 text-left md:px-7">
        <ReflectionContent
          reflection={reflection}
          titleId="izu-reflection-title-desktop"
        />
      </div>
    </section>
  </div>
);

export default IzuReflectionBubble;
