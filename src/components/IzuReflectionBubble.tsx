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
      className="mb-1 font-pixel text-[10px] uppercase tracking-widest text-izu-gold sm:mb-2 sm:text-sm"
    >
      {reflection.title}
    </h3>
    <p className="whitespace-pre-line font-body text-[13px] font-normal leading-6 text-slate-100 sm:text-sm sm:leading-7 md:text-base md:leading-8">
      {reflection.message}
    </p>
  </>
);

const ReflectionDebugLabel: React.FC<IzuReflectionBubbleProps> = ({ reflection }) => (
  <p className="font-pixel tracking-wider text-white opacity-55 md:text-[10px]">
    Matched reflection group: {reflection.group}
  </p>
);

const IzuReflectionBubble: React.FC<IzuReflectionBubbleProps> = ({ reflection }) => (
  <div className="mx-auto w-full max-w-[720px]">
    {ENABLE_TAROT_TEST_MODE && (
      <div className="mb-2 flex justify-center px-4 text-center">
        <ReflectionDebugLabel reflection={reflection} />
      </div>
    )}

    {/* Keep the reflection inside the artwork on every viewport. */}
    <section
      aria-labelledby="izu-reflection-title"
      className="relative"
    >
      <img
        src="/ui/izu-message-bubble.png"
        alt="Izu message bubble"
        className="h-auto w-full"
      />
      <div className="absolute left-[8%] top-[10%] flex h-[66%] w-[72%] flex-col items-center justify-center overflow-hidden text-center sm:left-[19%] sm:top-[31%] sm:block sm:h-auto sm:w-[60%] sm:max-w-[520px]">
        <ReflectionContent
          reflection={reflection}
          titleId="izu-reflection-title"
        />
      </div>
    </section>
  </div>
);

export default IzuReflectionBubble;
