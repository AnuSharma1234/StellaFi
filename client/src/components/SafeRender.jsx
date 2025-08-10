import React from 'react';

// Development component to help identify object rendering issues
export const SafeRender = ({ children, fallback = 'N/A', debugName = 'SafeRender' }) => {
  const renderSafely = (content) => {
    // Handle null/undefined
    if (content === null || content === undefined) {
      return fallback;
    }
    
    // Handle primitives (string, number, boolean)
    if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
      return content;
    }
    
    // Handle React elements
    if (React.isValidElement(content)) {
      return content;
    }
    
    // Handle arrays
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <SafeRender key={index} debugName={`${debugName}[${index}]`}>
          {item}
        </SafeRender>
      ));
    }
    
    // Handle objects (this is what causes the error)
    if (typeof content === 'object') {
      console.warn(`🚨 Attempting to render object in ${debugName}:`, content);
      
      // In development, show object structure
      if (process.env.NODE_ENV === 'development') {
        return (
          <span style={{ color: 'red', fontSize: '12px' }}>
            [Object: {Object.keys(content).join(', ')}]
          </span>
        );
      }
      
      // In production, try to find a sensible string representation
      if (content.toString && typeof content.toString === 'function') {
        const str = content.toString();
        if (str !== '[object Object]') {
          return str;
        }
      }
      
      // Last resort
      return fallback;
    }
    
    // Fallback for anything else
    return String(content);
  };
  
  try {
    return <>{renderSafely(children)}</>;
  } catch (error) {
    console.error(`🚨 Error in SafeRender (${debugName}):`, error);
    return <span style={{ color: 'red' }}>[Render Error]</span>;
  }
};

export default SafeRender;
