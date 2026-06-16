import { ENABLE_TAROT_TEST_MODE } from '../config/featureFlags';
import type { IzuThreeCardReflection } from '../utils/izuThreeCardReflection';

interface IzuReflectionBubbleProps {
  reflection: IzuThreeCardReflection;
}

const ReflectionDebugLabel: React.FC<IzuReflectionBubbleProps> = ({ reflection }) => (
  <p className="font-pixel tracking-wider text-white opacity-55 md:text-[10px]">
    Matched reflection group: {reflection.group}
  </p>
);

const IzuReflectionBubble: React.FC<IzuReflectionBubbleProps> = ({ reflection }) => (
  <div className="mx-auto w-full px-2 sm:px-4">
    {ENABLE_TAROT_TEST_MODE && (
      <div className="mb-2 flex justify-center px-4 text-center">
        <ReflectionDebugLabel reflection={reflection} />
      </div>
    )}

    {/* Main wrapper keeping the composition centered */}
    <div className="relative mx-auto w-full max-w-[760px]">
      {/* Separated bubble asset with CSS drop shadow */}
      <img
        src="/ui/Ms1.png"
        alt="Message bubble background"
        className="h-auto w-full drop-shadow-[0_0_20px_rgba(124,58,237,0.22)]"
      />

      {/* Message body text overlay strictly centered relative to the bubble center line */}
      <div className="absolute left-1/2 top-[30%] w-[76%] max-w-[420px] -translate-x-1/2 text-center sm:top-[34%] sm:w-[70%] sm:max-w-[560px]">
        <p className="whitespace-pre-line font-body text-[11px] font-normal leading-[1.5] text-white min-[390px]:text-[12px] min-[390px]:leading-[1.6] sm:text-[14px] sm:leading-[1.7] md:text-[16px] md:leading-[1.7]">
          {reflection.message}
        </p>
      </div>

      {/* Separated Izu character layer */}
      <img
        src="/ui/izu.png"
        alt="Izu character"
        className="absolute right-[-4%] bottom-[-10%] w-[24%] sm:right-[2%] sm:bottom-[-19%] sm:w-[26%] max-w-[200px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300"
      />
    </div>
  </div>
);

export default IzuReflectionBubble;
