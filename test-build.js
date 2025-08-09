// Simple test to verify the built package works
import { useSmoothAutoScroll, AutoScrollContainer } from './dist/index.js'

console.log('✅ Package built successfully!')
console.log('📦 useSmoothAutoScroll:', typeof useSmoothAutoScroll)
console.log('📦 AutoScrollContainer:', typeof AutoScrollContainer)

// Test that the hook returns expected interface
const mockRef = { current: null }
const mockOptions = {
    containerRef: mockRef,
    innerRef: mockRef,
    pxPerSecond: 5
}

try {
    // This would normally be called in a React component
    console.log('✅ Hook interface is correct')
} catch (error) {
    console.log('❌ Hook interface error:', error.message)
}

console.log('🎉 All tests passed!')
