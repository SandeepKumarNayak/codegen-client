import Button from '@/components/common/Button'
import { useCodeGeneration } from '@/hooks/useCodeGeneration'

export default function GenerateButton() {
    const { generate, stop, isGenerating } = useCodeGeneration()
    return isGenerating ? (
        <Button variant="danger" size="lg" onClick={stop} className="w-full animate-pulse-glow">
            ⏹ Stop Generation
        </Button>
    ) : (
        <Button variant="primary" size="lg" onClick={generate} className="w-full shadow-lg shadow-violet-900/40">
            ⚡ Generate Code
        </Button>
    )
}
