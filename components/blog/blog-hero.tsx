"use client";

export function BlogHero() {
  return (
    <section className="container mx-auto px-6 pt-12 pb-8">
      <div className="text-center">
        <h1 className="font-bold mb-5" style={{ fontSize: '2.75rem' }}>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bus Traffic Fever Blog
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover parking jam strategies, bus route planning tips, passenger collection notes, and practical walkthrough insights for Bus Traffic Fever.
        </p>
      </div>
    </section>
  );
}
