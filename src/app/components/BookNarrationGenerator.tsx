import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Mic, 
  BookOpen, 
  Play, 
  Download, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Volume2,
  FileAudio
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { 
  generateBookNarration, 
  estimateCharacterCount,
  checkBookNarrationExists,
  getBookAudio,
  type BookChapter 
} from '../utils/audioHelpers';

interface BookNarrationGeneratorProps {
  bookId: string;
  bookTitle: string;
  defaultVoice?: string;
}

export function BookNarrationGenerator({ 
  bookId, 
  bookTitle,
  defaultVoice = 'luna-warm' 
}: BookNarrationGeneratorProps) {
  const [selectedVoice, setSelectedVoice] = useState(defaultVoice);
  const [chapters, setChapters] = useState<BookChapter[]>([
    { title: 'Chapter 1', text: '' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [narrationExists, setNarrationExists] = useState(false);

  const voiceOptions = [
    { id: 'luna-warm', name: 'Luna', description: 'Warm and nurturing' },
    { id: 'forest-deep', name: 'Forest', description: 'Deep and calming' },
    { id: 'chirpy-joy', name: 'Chirpy', description: 'Playful and energetic' },
    { id: 'sage-wisdom', name: 'Professor Sage', description: 'Scholarly' },
    { id: 'aurora-mystical', name: 'Aurora', description: 'Mystical' },
    { id: 'captain-adventure', name: 'Captain Storm', description: 'Bold and adventurous' },
  ];

  // Check if narration already exists
  React.useEffect(() => {
    checkBookNarrationExists(bookId, selectedVoice).then(exists => {
      setNarrationExists(exists);
      if (exists) {
        toast.info('Narration already exists for this book and voice');
      }
    });
  }, [bookId, selectedVoice]);

  const handleAddChapter = () => {
    setChapters([...chapters, { title: `Chapter ${chapters.length + 1}`, text: '' }]);
  };

  const handleRemoveChapter = (index: number) => {
    if (chapters.length === 1) {
      toast.error('Book must have at least one chapter');
      return;
    }
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleChapterChange = (index: number, field: 'title' | 'text', value: string) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const handleGenerateNarration = async () => {
    // Validate chapters
    const emptyChapters = chapters.filter(ch => !ch.text.trim());
    if (emptyChapters.length > 0) {
      toast.error('All chapters must have content');
      return;
    }

    setIsGenerating(true);
    setProgress({ current: 0, total: chapters.length });

    try {
      const result = await generateBookNarration(
        {
          bookId,
          voiceId: selectedVoice,
          chapters,
        },
        (current, total) => {
          setProgress({ current, total });
        }
      );

      toast.success('Book narration generated successfully!', {
        description: `${result.generatedChapters}/${result.totalChapters} chapters completed`
      });

      setNarrationExists(true);
      
      // Fetch the audio to get URLs
      const audio = await getBookAudio(bookId, selectedVoice);
      if (audio.chapters.length > 0 && audio.chapters[0].url) {
        setGeneratedUrl(audio.chapters[0].url);
      }
    } catch (error: any) {
      console.error('Error generating narration:', error);
      toast.error('Failed to generate narration', {
        description: error.message || 'Please check your API configuration'
      });
    } finally {
      setIsGenerating(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleLoadExistingNarration = async () => {
    try {
      const audio = await getBookAudio(bookId, selectedVoice);
      toast.success('Loaded existing narration', {
        description: `${audio.chapters.length} chapters available`
      });
      if (audio.chapters.length > 0 && audio.chapters[0].url) {
        setGeneratedUrl(audio.chapters[0].url);
      }
    } catch (error: any) {
      toast.error('Failed to load narration', {
        description: error.message
      });
    }
  };

  const estimate = estimateCharacterCount(chapters);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileAudio className="w-5 h-5" />
              Generate Book Narration
            </CardTitle>
            <CardDescription>
              Create AI narration for: <strong>{bookTitle}</strong>
            </CardDescription>
          </div>
          {narrationExists && (
            <Badge className="bg-green-500">
              <CheckCircle className="w-3 h-3 mr-1" />
              Exists
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Narrator Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {voiceOptions.map(voice => (
                <SelectItem key={voice.id} value={voice.id}>
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    <span>{voice.name}</span>
                    <span className="text-xs text-muted-foreground">- {voice.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cost Estimate */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900">
              <AlertCircle className="w-4 h-4" />
              Cost Estimate
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Characters</p>
                <p className="font-bold text-lg">{estimate.totalCharacters.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-bold text-lg">~{estimate.estimatedMinutes} min</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tier</p>
                <p className="font-bold text-lg">{estimate.estimatedCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Book Chapters</label>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleAddChapter}
              disabled={isGenerating}
            >
              Add Chapter
            </Button>
          </div>

          {chapters.map((chapter, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Input
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                    placeholder="Chapter title"
                    className="flex-1 mr-2"
                    disabled={isGenerating}
                  />
                  {chapters.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveChapter(index)}
                      disabled={isGenerating}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <Textarea
                  value={chapter.text}
                  onChange={(e) => handleChapterChange(index, 'text', e.target.value)}
                  placeholder="Enter chapter text here..."
                  className="min-h-[100px]"
                  disabled={isGenerating}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {(chapter.title.length + chapter.text.length).toLocaleString()} characters
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress */}
        {isGenerating && (
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-900">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Narration...
              </div>
              <Progress 
                value={(progress.current / progress.total) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                Chapter {progress.current} of {progress.total}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerateNarration}
            disabled={isGenerating || chapters.some(ch => !ch.text.trim())}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Generate Narration
              </>
            )}
          </Button>

          {narrationExists && (
            <Button
              variant="outline"
              onClick={handleLoadExistingNarration}
              disabled={isGenerating}
            >
              <Download className="w-4 h-4 mr-2" />
              Load Existing
            </Button>
          )}
        </div>

        {/* Preview Player */}
        {generatedUrl && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Narration Ready</p>
                  <p className="text-xs text-muted-foreground">Preview Chapter 1</p>
                </div>
                <audio controls src={generatedUrl} className="max-w-xs">
                  Your browser does not support audio playback.
                </audio>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Generated audio files are stored permanently and can be reused. 
              Each chapter is generated separately and cached for future playback. 
              Regenerating will create new files and may incur additional API costs.
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
