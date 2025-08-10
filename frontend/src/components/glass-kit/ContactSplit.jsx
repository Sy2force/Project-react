import React from 'react';
import { Input, Textarea } from './Input';
import Button from './Button';

/**
 * ContactSplit - Formulaire de contact en 2 colonnes
 */
export function ContactSplit({ onSubmit }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="glass rounded-2xl p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input 
            required 
            name="name" 
            placeholder="Nom" 
            className="w-full"
          />
          <Input 
            required 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="w-full"
          />
          <Input 
            name="phone" 
            placeholder="Téléphone (optionnel)" 
            className="w-full"
          />
          <Input 
            required 
            name="subject" 
            placeholder="Sujet" 
            className="w-full"
          />
          <Textarea 
            required 
            name="message" 
            placeholder="Message" 
            maxLength={2000} 
            className="w-full"
          />
          <Button variant="primary" className="w-full">
            Envoyer
          </Button>
        </form>
      </div>
      <div className="glass rounded-2xl p-6">
        <h4 className="font-display text-white text-xl line-clamp-1">
          Coordonnées
        </h4>
        <p className="text-white/70 mt-2 line-clamp-3">
          Email, téléphone, horaires…
        </p>
        <div className="mt-4 h-56 rounded-xl bg-white/5 flex items-center justify-center">
          <span className="text-white/40">Carte ou informations</span>
        </div>
      </div>
    </div>
  );
}

export default ContactSplit;
