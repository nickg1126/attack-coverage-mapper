import fs from 'fs';

const url = 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json';

const res = await fetch(url);
const data = await res.json();

const techniques = data.objects
  .filter(o => o.type === 'attack-pattern' && !o.revoked && !o.x_mitre_deprecated)
  .map(o => ({
    id: o.external_references?.find(r => r.source_name === 'mitre-attack')?.external_id,
    name: o.name,
    tactic: o.kill_chain_phases?.[0]?.phase_name?.replace(/-/g, ' ')
  }))
  .filter(t => t.id && t.tactic);

fs.writeFileSync('src/data/techniques.json', JSON.stringify(techniques, null, 2));
console.log(`Saved ${techniques.length} techniques`);
