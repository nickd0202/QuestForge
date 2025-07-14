'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

// Placeholder options
const builds = ['Lean', 'Average', 'Muscular'];
const outfits = ['Rogue', 'Warrior', 'Mage'];
const colorPalettes = {
  skin: ['#f5cda7', '#d2a679', '#8d5524'],
  hairStyle: ['Short', 'Long', 'Curly', 'Bald'],
  hairColor: ['#000000', '#6b4423', '#ffffff', '#c1440e'],
  eyeColor: ['#0000ff', '#00ff00', '#8b4513', '#000000'],
  clothesColor: {
    Rogue: ['#2f2f2f', '#4a4a4a', '#1a1a1a'],
    Warrior: ['#888888', '#bbbbbb', '#555555'],
    Mage: ['#7f00ff', '#ff7f00', '#00ffff']
  }
};

export default function CharacterPage() {
  const [skinToneIdx, setSkinToneIdx] = useState(0);
  const [hairStyleIdx, setHairStyleIdx] = useState(0);
  const [hairColorIdx, setHairColorIdx] = useState(0);
  const [eyeColorIdx, setEyeColorIdx] = useState(0);
  const [buildIdx, setBuildIdx] = useState(0);
  const [outfitIdx, setOutfitIdx] = useState(0);
  const [clothesColorIdx, setClothesColorIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const currentOutfit = outfits[outfitIdx];
  const getClothesColors = () => colorPalettes.clothesColor[currentOutfit] || [];

  const cycle = (idx, arr, setter, delta) => {
    const len = arr.length;
    setter((idx + delta + len) % len);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        skinTone: colorPalettes.skin[skinToneIdx],
        hairStyle: colorPalettes.hairStyle[hairStyleIdx],
        hairColor: colorPalettes.hairColor[hairColorIdx],
        eyeColor: colorPalettes.eyeColor[eyeColorIdx],
        build: builds[buildIdx],
        outfit: currentOutfit,
        clothesColor: getClothesColors()[clothesColorIdx]
      };
      await api.post('/character', payload);
      // optionally show a success message
    } catch (e) {
      console.error(e);
      setError('Failed to save character.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-background text-foreground space-y-6">
      <h1 className="text-2xl font-bold text-center">Character Customization</h1>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          {/* Placeholder avatar */}
          <div
            className="w-32 h-32 mx-auto rounded-full"
            style={{ backgroundColor: colorPalettes.skin[skinToneIdx] }}
          >
            {/* In real app, you would overlay SVG/images here */}
          </div>

          {/* Skin Tone */}
          <div className="flex items-center justify-between">
            <span>Skin Tone</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(skinToneIdx, colorPalettes.skin, setSkinToneIdx, -1)}>&lt;</Button>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colorPalettes.skin[skinToneIdx] }} />
              <Button size="sm" onClick={() => cycle(skinToneIdx, colorPalettes.skin, setSkinToneIdx, 1)}>&gt;</Button>
            </div>
          </div>

          {/* Hair Style & Color */}
          <div className="flex items-center justify-between">
            <span>Hair Style</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(hairStyleIdx, colorPalettes.hairStyle, setHairStyleIdx, -1)}>&lt;</Button>
              <span>{colorPalettes.hairStyle[hairStyleIdx]}</span>
              <Button size="sm" onClick={() => cycle(hairStyleIdx, colorPalettes.hairStyle, setHairStyleIdx, 1)}>&gt;</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Hair Color</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(hairColorIdx, colorPalettes.hairColor, setHairColorIdx, -1)}>&lt;</Button>
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colorPalettes.hairColor[hairColorIdx] }} />
              <Button size="sm" onClick={() => cycle(hairColorIdx, colorPalettes.hairColor, setHairColorIdx, 1)}>&gt;</Button>
            </div>
          </div>

          {/* Eye Color */}
          <div className="flex items-center justify-between">
            <span>Eye Color</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(eyeColorIdx, colorPalettes.eyeColor, setEyeColorIdx, -1)}>&lt;</Button>
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: colorPalettes.eyeColor[eyeColorIdx] }} />
              <Button size="sm" onClick={() => cycle(eyeColorIdx, colorPalettes.eyeColor, setEyeColorIdx, 1)}>&gt;</Button>
            </div>
          </div>

          {/* Build */}
          <div className="flex items-center justify-between">
            <span>Build</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(buildIdx, builds, setBuildIdx, -1)}>&lt;</Button>
              <span>{builds[buildIdx]}</span>
              <Button size="sm" onClick={() => cycle(buildIdx, builds, setBuildIdx, 1)}>&gt;</Button>
            </div>
          </div>

          {/* Outfit & Clothes Color */}
          <div className="flex items-center justify-between">
            <span>Outfit</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => { cycle(outfitIdx, outfits, setOutfitIdx, -1); setClothesColorIdx(0); }}>&lt;</Button>
              <span>{currentOutfit}</span>
              <Button size="sm" onClick={() => { cycle(outfitIdx, outfits, setOutfitIdx, 1); setClothesColorIdx(0); }}>&gt;</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Clothes Color</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={() => cycle(clothesColorIdx, getClothesColors(), setClothesColorIdx, -1)}>&lt;</Button>
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: getClothesColors()[clothesColorIdx] }} />
              <Button size="sm" onClick={() => cycle(clothesColorIdx, getClothesColors(), setClothesColorIdx, 1)}>&gt;</Button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="text-center">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
