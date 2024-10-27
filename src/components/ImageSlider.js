import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from './ui/use-toast';

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [copying, setCopying] = useState(false);
  const { toast } = useToast();

  const captions = {
    1: "Depressed",
    2: "Anxious",
    3: "Coping",
    4: "Content",
    5: "Happy"
  };

  const handleSliderChange = (values) => {
    setCurrentImage(values[0]);
  };

  const copyImageToClipboard = async () => {
    try {
      const imageElement = document.querySelector(`img[alt="Image ${currentImage}"]`);
      const response = await fetch(imageElement.src);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
  
      setCopying(true);
      toast({
        title: "Image copied!",
        description: "The image has been copied to your clipboard.",
      });
  
      setTimeout(() => {
        setCopying(false);
      }, 1000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy image to clipboard.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-xl p-6 space-y-6">
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-[105px] h-[177px] overflow-hidden rounded-lg bg-gray-100">
              <div 
                className="absolute flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentImage - 1) * 105}px)`
                }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <img
                    key={num}
                    src={`${num}.png`}
                    alt={`${num} `}
                    className="w-[105px] h-[177px] object-cover"
                  />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center transition-opacity duration-300">
              {captions[currentImage]}
            </p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={copyImageToClipboard}
              className="flex items-center gap-2"
              id="copyButton"
            >
              {copying ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Image
                </>
              )}
            </Button>
          </div>
          
          <div className="px-4">
            <Slider
              defaultValue={[1]}
              min={1}
              max={5}
              step={1}
              value={[currentImage]}
              onValueChange={handleSliderChange}
              className="w-full"
            />
          </div>
          

        </CardContent>
      </Card>
    </div>
  );
};

export default ImageSlider;