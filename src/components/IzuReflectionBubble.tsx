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

    {/* Production reflection asset wrapper */}
    <div className="relative mx-auto w-full max-w-[760px] pb-20 sm:pb-8">
      <img
        src="/ui/Ms2.png"
        alt="Izu reflection bubble background"
        className="h-auto w-full drop-shadow-[0_0_20px_rgba(124,58,237,0.22)]"
      />

      {/* Message body text overlay centered inside Ms2 bubble */}
      <div className="absolute left-1/2 top-[38%] w-[72%] -translate-x-1/2 -translate-y-1/2 text-center sm:top-[48%]">
        <p className="whitespace-pre-line font-body text-[11px] font-normal leading-[1.45] text-white min-[390px]:text-[12px] min-[390px]:leading-[1.55] sm:text-[14px] sm:leading-[1.7] md:text-[16px] md:leading-[1.7]">
          {reflection.message}
        </p>
      </div>

      {/* Separated Izu character layer placed partly under/overlapping Ms2 bottom-right */}
      <img
        src="/ui/izu.png"
        alt="Izu character"
        className="absolute right-[0%] bottom-[0%] w-[32%] sm:right-[2%] sm:bottom-[-2%] sm:w-[26%] md:right-[4%] md:bottom-[-2%] md:w-[22%] max-w-[160px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300"
      />
    </div>
  </div>
);

export default IzuReflectionBubble;
